import React, { useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaEye, FaTimes } from "react-icons/fa";
import Header from "./shared/Header";

export default function AssociatedSkills({ ref }) {
  const [isAdding, setIsAdding] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editSkill, setEditSkill] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [error, setError] = useState("");
  const addSkillRef = useRef();
  const addSkillDescRef = useRef();
  ref.current =skills.length>0? skills.map((s) => ({
    skill: s.skill,
    description: s.description,
  })):[];
  const handleAddSkill = () => {
    const skillName = addSkillRef.current.value.trim();
    const skillDesc = addSkillDescRef.current.value.trim();

    if (!skillName || !skillDesc) {
      setError("Skill name and description fields are required.");
      return;
    }
    setError("");

    const newSkill = {
      id: skills.length + 1,
      skill: skillName,
      description: skillDesc,
    };
    setSkills([...skills, newSkill]);
    setIsAdding(false);
  };

  const handleEditInit = (skillItem) => {
    setSelected(skillItem);
    setEditSkill(skillItem.skill);
    setEditDescription(skillItem.description);
  };

  const handleUpdateSkill = () => {
    if (!editSkill.trim() || !editDescription.trim()) {
      setError("Skill name and description cannot be empty.");
      return;
    }
    setError("");

    setSkills(
      skills.map((s) =>
        s.id === selected.id
          ? { ...s, skill: editSkill, description: editDescription }
          : s
      )
    );
    setSelected(null);
  };
  console.log(skills);
  console.log(ref);
  return (
    <div className="bg-[var(--sidebar-icon-bg)] rounded-lg p-4 text-gray-900 font-medium">
      <div className="flex justify-between items-center mb-3">
        <Header>&#x1F9E0; Associated Skills</Header>
        <div
          onClick={() => setIsAdding(true)}
          className="flex text-[10px] sm:text-[12px] gap-1.5 items-center text-blue-600 font-medium  cursor-pointer hover:text-blue-700 transition"
        >
          <AiOutlinePlusCircle className="text-sm" />
          <span>Add Skill</span>
        </div>
      </div>

      {error && (
        <p className="p-4 pl-2 border-l-4 border-l-red-500 bg-white text-gray-900 text-sm rounded-2xl">
          {error}
        </p>
      )}

      {isAdding && (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            ref={addSkillRef}
            className="w-full bg-white placeholder:text-[12px] outline-none p-2 border border-gray-300 rounded placeholder-gray-500"
            placeholder="Enter a tag"
          />
          <textarea
            ref={addSkillDescRef}
            className="w-full bg-white outline-none  placeholder:text-[12px] p-2 border border-gray-300 rounded placeholder-gray-500"
            placeholder="Description"
            rows="2"
          />
          <button
            onClick={handleAddSkill}
            className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white py-1.5 rounded-md text-sm"
          >
            Save
          </button>
        </div>
      )}

      {skills.length > 0 && !isAdding && (
        <ul className="mt-4 space-y-3">
          {skills.map((skillItem) => (
            <li
              key={skillItem.id}
              className={`p-3 rounded-lg bg-white shadow ${
                selected?.id !== skillItem.id && "hover:shadow-md transition"
              }`}
            >
              <div className="flex justify-between items-center">
                {selected?.id === skillItem.id ? (
                  <div className="w-full space-y-2">
                    <input
                      type="text"
                      value={editSkill}
                      onChange={(e) => setEditSkill(e.target.value)}
                      className="w-full bg-white outline-none p-2 border border-gray-300 rounded placeholder-gray-500"
                      placeholder="Enter a tag"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full bg-white outline-none p-2 border border-gray-300 rounded placeholder-gray-500"
                      placeholder="Description"
                      rows="2"
                    />
                    <button
                      onClick={handleUpdateSkill}
                      className="w-full bg-blue-500  hover:bg-blue-600 cursor-pointer text-white py-1.5 rounded-md text-sm"
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-gray-900 font-bold">
                        {skillItem.skill}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <FaEye
                        onClick={() => handleEditInit(skillItem)}
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
                      />
                      <FaTimes
                        onClick={() =>
                          setSkills(skills.filter((s) => s.id !== skillItem.id))
                        }
                        className="cursor-pointer text-red-500 hover:text-red-700 transition"
                      />
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
