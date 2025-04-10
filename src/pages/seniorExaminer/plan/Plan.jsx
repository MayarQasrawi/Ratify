import React, { useRef, useState } from 'react';
import { BiPlusCircle, BiChevronDown, BiChevronRight, BiEdit } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/shared/modal/Modal';
import ConfirmationModal from '../../../components/shared/modal/ConfirmationModal';
import Accordion from '../../../components/seniorExaminer/plan/Accordion';
const initialPlan = {
    levels: [
      {
        id: "lvl1",
        name: "Junior",
        description: "Entry‑level candidates",
        order: 1,
        stages: [
          {
            id: "stg1",
            type: "Interview",
            description: "Phone screen",
            PassingScore: 50,
            order: 1,
            criteria: [
              {
                id: "c1",
                name: "Communication",
                description: "Clarity of answers",
                Weight: 50,
              },
              {
                id: "c2",
                name: "Experience",
                description: "Relevant background",
                Weight: 50,
              },
            ],
          },
          {
              id: "stg",
              type: "Interview",
              description: "Phone screen",
              PassingScore: 50,
              order: 1,
              criteria: [
                {
                  id: "c1",
                  name: "Communication",
                  description: "Clarity of answers",
                  Weight: 50,
                },
                {
                  id: "c2",
                  name: "Experience",
                  description: "Relevant background",
                  Weight: 50,
                },
              ],
            },
        ],
      },
      {
        id: "lvl2",
        name: "Senior",
        description: "Experienced hires",
        order: 2,
        stages: [
          {
            id: "stg2",
            type: "Task",
            description: "Coding challenge",
            PassingScore: 70,
            order: 1,
            criteria: [
              {
                id: "c3",
                name: "Correctness",
                description: "Bug‑free solution",
                Weight: 60,
              },
              {
                id: "c4",
                name: "Efficiency",
                description: "Optimal performance",
                Weight: 40,
              },
            ],
          },
        ],
      },
    ],
  };

export default function Plan() {
  const [plan, setPlan] = useState(initialPlan);
  const navigate = useNavigate();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const levelIndex = useRef();
  const stageIndex = useRef();
  const criterionIndex = useRef();
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editType, setEditType] = useState(''); 
  console.log(levelIndex.current, 'level', stageIndex.current);
//   const submitNewCriterion = () => {
//   };
//   const deleteLevel = () => {
//   };
//   const deleteStage = () => {
//   };
//   const deleteCriterion = () => {
//   };
  
  const handleEditLevel = (level) => {
    setItemToEdit(level);
    setEditType('level');
    setUpdateModalOpen(true);
  };
  
  const handleEditStage = (level, stage) => {
    setItemToEdit({...stage, levelId: level.id});
    setEditType('stage');
    setUpdateModalOpen(true);
  };
  
  const handleEditCriterion = (level, stage, criterion) => {
    setItemToEdit({...criterion, levelId: level.id, stageId: stage.id});
    setEditType('criterion');
    setUpdateModalOpen(true);
  };
  
  const handleUpdateSubmit = () => {
    console.log(itemToEdit,'update')
    setUpdateModalOpen(false);
    setItemToEdit(null);
  };

  return (
    <>
      {open && (
        <Modal>
          <ConfirmationModal
            view={true}
            Cancle={() => {
                setOpen(false);
                stageIndex.current=null;
                levelIndex.current=null;
            }}
          >
            Are you sure you want to delete this level?
          </ConfirmationModal>
        </Modal>
      )}
      
      {updateModalOpen && (
        <Modal>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">
                {editType === 'level' ? 'Edit Level' : 
                 editType === 'stage' ? 'Edit Stage' : 'Edit Criterion'}
              </h3>
              <button 
                onClick={() => setUpdateModalOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <AiOutlineClose size={20} className='cursor-pointer' />
              </button>
            </div>
            
            {editType === 'level' && itemToEdit && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name <span className='text-red-500'>*</span></label>
                  <input 
                    type="text" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none focus:border-blue-500 "
                    value={itemToEdit.name}
                    onChange={(e) => setItemToEdit({...itemToEdit, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description <span className='text-red-500'>*</span></label>
                  <textarea 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none focus:border-blue-500"
                    value={itemToEdit.description}
                    rows={3}
                    onChange={(e) => setItemToEdit({...itemToEdit, description: e.target.value})}
                  />
                </div>
              </div>
            )}
            
            {editType === 'stage' && itemToEdit && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type<span className='text-red-500'>*</span></label>
                  <select 
                  onChange={(e) => setItemToEdit({...itemToEdit, type: e.target.value})}
                  className="w-[100%] mt-2 shadow-sm h-12 px-4 border border-gray-300 rounded-lg outline-none"
                >
                  <option value="Interview">Interview</option>
                  <option value="Task">Task</option>
                  <option value="Exam">Exam</option>
                </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description<span className='text-red-500'>*</span></label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 outline-none"
                    value={itemToEdit.description}
                    onChange={(e) => setItemToEdit({...itemToEdit, description: e.target.value})}
                  />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Passing Score<span className='text-red-500'>*</span></label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="w-[100%] h-12 px-4 border border-gray-300 rounded-lg shadow-sm outline-none focus:border-blue-500 mt-2"
                  value={itemToEdit.PassingScore}
                 onChange={(e) => setItemToEdit({...itemToEdit, PassingScore: Number(e.target.value)})}
                />
                </div>
              </div>
            )}
            
            {editType === 'criterion' && itemToEdit && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name<span className='text-red-500'>*</span></label>
                  <input 
                    type="text" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 outline-none"
                    value={itemToEdit.name}
                    onChange={(e) => setItemToEdit({...itemToEdit, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description<span className='text-red-500'>*</span></label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 outline-none"
                    value={itemToEdit.description}
                    onChange={(e) => setItemToEdit({...itemToEdit, description: e.target.value})}
                  />
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setUpdateModalOpen(false)}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateSubmit}
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </Modal>
      )}
      
      <div className="p-6 pt-2 max-w-4xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Assessment Plan</h1>
        </div>
        <div className="mb-6">
          <button
            className="cursor-pointer text-sm flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => navigate('/dashboard/seniorExaminer/plan-setup',{ state: { source: 'add' ,length:plan.levels.length } })}
          >
            <BiPlusCircle className="mr-2" /> Add Level
          </button>
        </div>
        <div className="space-y-6">
          {plan.levels.map((lvl, i) => (
            <Accordion
              key={lvl.id}
              title={
                <div className="flex items-center justify-between w-full">
                  <span>{`Level ${lvl.order}: ${lvl.name}`}</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditLevel(lvl)}
                      className="p-1 text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <BiEdit size={20} className='cursor-pointer' />
                    </button>
                  </div>
                </div>
              }
              description={lvl.description}
              onDelete={() => {setOpen(true);levelIndex.current=lvl.id}}
            >
              <div className="mb-4">
                <button
                  className="flex items-center text-green-600 rounded-md text-sm px-3 py-1 cursor-pointer hover:bg-green-50 transition"
                  onClick={() => 
                    navigate('/dashboard/seniorExaminer/plan-setup',{ state: { source: 'add-stage' ,length:plan.levels[i].stages.length,level:plan.levels[i] }})
                  }
                >
                  <BiPlusCircle className="mr-2" /> Add Stage
                </button>
              </div>
              {console.log(plan.levels[i].stages.length)}
              <div className="pl-4">
                {lvl.stages.map((stg, j) => (
                  <Accordion
                    key={stg.id}
                    title={
                      <div className="flex items-center justify-between w-full">
                        <span>{`Stage ${stg.order}: ${stg.type}`}</span>
                        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                          <button
                            onClick={() => handleEditStage(lvl, stg)}
                            className="p-1 text-blue-500 hover:text-blue-700 mr-2"
                          >
                            <BiEdit size={18} className='cursor-pointer' />
                          </button>
                        </div>
                      </div>
                    }
                    description={stg.description}
                    badge={`Passing Score: ${stg.PassingScore}%`}
                    onDelete={() =>{setOpen(true);levelIndex.current=lvl.id;stageIndex.current=stg.id }}
                  >
                    <div className="mb-4">
                      <button
                        className="cursor-pointer flex items-center text-green-600 px-3 py-1 rounded-md hover:bg-green-50 transition text-[13px]"
                        onClick={() => {
                        
                        }}
                      >
                        <BiPlusCircle className="mr-1" /> Add Criteria
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium mb-3 text-gray-700">Evaluation Criteria</h4>
                        <div className="space-y-3">
                          {stg.criteria.map((crit, k) => (
                            <div key={crit.id} className="bg-white p-3 rounded-md shadow-sm flex justify-between items-start">
                              <div>
                                <div className="font-medium text-gray-800">{crit.name}</div>
                                <div className="text-sm text-gray-600 mt-1">{crit.description}</div>
                                <div className="flex items-center mt-2">
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div 
                                      className="bg-blue-500 h-1.5 rounded-full" 
                                      style={{ width: `${crit.Weight}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-600 ml-2">{crit.Weight}%</span>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleEditCriterion(lvl, stg, crit)}
                                  className="p-1 text-blue-500 hover:text-blue-700 mr-2"
                                >
                                  <BiEdit size={16} className='cursor-pointer' />
                                </button>
                                <button
                                  className="p-1 text-red-500 hover:text-red-700"
                                >
                                  <AiOutlineClose size={16}  className='cursor-pointer'/>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                    </div>
                  </Accordion>
                ))}
              </div>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}

