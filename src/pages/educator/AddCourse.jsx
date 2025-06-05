import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import { assets } from "../../assets/assets";
import axios from "axios";
import { uploadImage } from "../../utilities/utilities";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
const API_URL = import.meta.env.VITE_API_BASE_URL;
const AddCourse = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const quillRef = useRef(null);
  const editorDivRef = useRef(null);

  const [formData, setFormData] = useState({
    courseTitle: "",
    coursePrice: 0,
    discount: 0,
  });

  const [chapters, setChapters] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  useEffect(() => {
    if (!quillRef.current && editorDivRef.current) {
      quillRef.current = new Quill(editorDivRef.current, { theme: "snow" });
    }
  }, []);

  const handleInputChange = async (e) => {
    const { name, value, type, files } = e.target;
    let val;

    if (type === "file") {
      if (files.length > 0) {
        val = files[0]; // Store the file object for preview
        setImgLoading(true);
        
        try {
          const uploadedImg = await uploadImage(val);
          if (uploadedImg.display_url) {
            setImgUrl(uploadedImg.display_url);
          } else {
            console.error("Image upload failed");
          }
        } catch (err) {
          console.error("Image upload error:", err);
        } finally {
          setImgLoading(false);
        }
      }
    } else {
      val = value;
    }

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const addLecture = () => {
    setChapters((prev) =>
      prev.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length + 1,
            lectureId: uniqid(),
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture],
          };
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleChapter = (action, chapterId = null) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        setChapters((prev) => [
          ...prev,
          {
            chapterId: uniqid(),
            chapterTitle: title,
            chapterContent: [],
            collapsed: false,
            chapterOrder: prev.length + 1,
          },
        ]);
      }
    } else if (action === "remove") {
      setChapters((prev) =>
        prev.filter((chap) => chap.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters((prev) =>
        prev.map((chap) =>
          chap.chapterId === chapterId
            ? { ...chap, collapsed: !chap.collapsed }
            : chap
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex = null) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters((prev) =>
        prev.map((chap) =>
          chap.chapterId === chapterId
            ? {
                ...chap,
                chapterContent: chap.chapterContent.filter(
                  (_, idx) => idx !== lectureIndex
                ),
              }
            : chap
        )
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      ...formData,
      descriptionHTML: quillRef.current.root.innerHTML,
      courseThumbnail: imgUrl || formData.courseThumbnail,
      userEmail: user?.email,
    };
    console.log(courseData);

    if (!imgLoading) {
      try {
        const { data } = await axios.post(
          `${API_URL}/educator/add-course`,
          courseData
        );
        console.log("Course submitted:", data);
      } catch (error) {
        console.error("Submit failed:", error);
      }
    }
  };

  return (
    <div className="h-screen  overflow-scroll flex flex-col items-start justify-between p-4 md:p-8 pt-8 pb-0">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <p>Course Title</p>
          <input
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            placeholder="Type here"
            className="border  px-2 py-1 rounded-sm border-gray-300"
            type="text"
            required
          />
        </div>
        <div>
          <p>Course Description</p>
          <div ref={editorDivRef} className="bg-white border p-2 rounded" />
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p>Course Price</p>
            <input
              name="coursePrice"
              value={formData.coursePrice}
              onChange={handleInputChange}
              type="number"
              className="border  px-2 py-1 rounded-sm border-gray-300"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <p>{imgLoading ? "Uploading..." : "Thumbnail"}</p>
            <label htmlFor="thumbnailImage" className="cursor-pointer">
              <img
                src={assets.file_upload_icon}
                className="p-3 bg-blue-500 rounded"
                alt="Upload"
              />
            </label>
            <input
              type="file"
              id="thumbnailImage"
              name="courseThumbnail"
              onChange={handleInputChange}
              accept="image/*"
              hidden
            />
            {imgUrl && <img src={imgUrl} className="max-h-10" alt="Preview" />}
          </div>
        </div>
        <div>
          <p>Discount %</p>
          <input
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            type="number"
            placeholder="0"
            className="border  px-2 py-1 rounded-sm border-gray-300"
            required
          />
        </div>
        <div className="space-y-4">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.chapterId}>
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  {/* Toggling chapters */}
                  <img
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                  />
                  <span>
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <span>{chapter.chapterContent.length} Lectures</span>
                {/* remove chapter */}
                <img
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                  src={assets.cross_icon}
                  className="cursor-pointer"
                  alt=""
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lecture.lectureId}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {" "}
                          Link{" "}
                        </a>
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        onClick={() =>
                          handleLecture(
                            "remove",
                            chapter.chapterId,
                            lectureIndex
                          )
                        }
                        src={assets.cross_icon}
                        className="cursor-pointer"
                        alt="Remove"
                      />
                    </div>
                  ))}
                  <div
                    className="text-blue-600 cursor-pointer"
                    onClick={() => handleLecture("add", chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            onClick={() => handleChapter("add")}
            className="text-center bg-blue-100 p-2 rounded-lg cursor-pointer"
          >
            + Add Chapter
          </div>
        </div>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative ">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                🎓 Add New Lecture
              </h2>

              <div className="space-y-4">
                {/* Lecture Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Introduction to React"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails((prev) => ({
                        ...prev,
                        lectureTitle: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (in minutes)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. 45"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails((prev) => ({
                        ...prev,
                        lectureDuration: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Lecture URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lecture Video URL
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. https://video-host.com/lecture123"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails((prev) => ({
                        ...prev,
                        lectureUrl: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Preview Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails((prev) => ({
                        ...prev,
                        isPreviewFree: e.target.checked,
                      }))
                    }
                    className="accent-blue-600 w-4 h-4"
                  />
                  <label className="text-sm text-gray-700">
                    Make this lecture free to preview?
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
                    onClick={addLecture}
                  >
                    Add Lecture
                  </button>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-red-500 transition"
                    onClick={() => setShowPopup(false)}
                  >
                    ✖ Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded cursor-pointer"
        >
          Submit Course
        </button>
        {imgLoading && <h2>Loading..</h2>}
      </form>
    </div>
  );
};

export default AddCourse;
