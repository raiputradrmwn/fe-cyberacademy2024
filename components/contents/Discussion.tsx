"use client";

import { useState, useEffect, useRef } from 'react';
import { dmSans } from '@/styles/font';

// Define the possible module options as a union of string literals
type ModuleOption = 'Basic Linux' | 'Web Development' | 'IoT' | 'Machine Learning';

const Discussion = () => {
  const [selectedModul, setSelectedModul] = useState<ModuleOption>('Web Development');
  const [filter, setFilter] = useState('Newest');
  
  // Define discussionsData with keys matching the ModuleOption type
  const discussionsData: Record<ModuleOption, { id: number; user: string; time: string; content: string }[]> = {
    'Web Development': [
      {
        id: 1,
        user: 'Citra Kusumadewi Sribawono',
        time: '1 day ago',
        content:
          "Linux is an open-source operating system (OS) that manages a computer's hardware and resources, such as memory, CPU, and storage.",
      },
    ],
    'Basic Linux': [
      {
        id: 2,
        user: 'Agung Kusumadewi Sribawono',
        time: '1 days ago',
        content:
          "Linux is an open-source operating system (OS) that manages a computer's hardware and resources, such as memory, CPU, and storage.",
      },
    ],
    'IoT': [
      {
        id: 3,
        user: 'Jajang miharja',
        time: '3 days ago',
        content:
          "IoT Iot apa yang Iot?",
      },
    ],
    'Machine Learning': [
      {
        id: 4,
        user: 'Niki Zefanya',
        time: '5 days ago',
        content:
          "Machine learning apaan?",
      },
    ],
  };

  const [discussions, setDiscussions] = useState(discussionsData[selectedModul]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const options: ModuleOption[] = ['Basic Linux', 'Web Development', 'IoT', 'Machine Learning'];

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: ModuleOption) => {
    setSelectedModul(option);
    setDiscussions(discussionsData[option]);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className={`p-20 ml-10 ${dmSans.className}`}>
      <h1 className="text-red-600 text-5xl font-bold mt-10">Forum Discussion</h1>
      <div className="mt-10">
        <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-3xl">
          Create New Discussion
        </button>
      </div>
      <div className="flex mt-10">
        <div className="w-1/4 bg-white border border-gray-100 p-6 shadow-lg rounded-2xl h-[240px]">
          <h2 className="font-bold mb-4">Filter Discussion</h2>
          <div className="border-b border-gray-300 mb-4">
            <label className="block mb-2">
              <input
                type="radio"
                name="filter"
                value="Newest"
                checked={filter === 'Newest'}
                onChange={(e) => setFilter(e.target.value)}
                className="accent-black"
              />
              <span className="ml-2">Newest</span>
            </label>
            <label className="block mb-4">
              <input
                type="radio"
                name="filter"
                value="Oldest"
                checked={filter === 'Oldest'}
                onChange={(e) => setFilter(e.target.value)}
                className="accent-black"
              />
              <span className="ml-2">Oldest</span>
            </label>
          </div>

          <input
            type="text"
            placeholder="Find keyword"
            className="border border-gray-100 p-2 rounded w-full rounded-3xl mb-6 shadow-lg"
          />
        </div>
        <div className="w-3/4 ml-10">
          {/* Custom Select Dropdown */}
          <div className="relative w-full mb-6" ref={selectRef}>
            <button
              onClick={handleDropdown}
              className="border border-gray-100 p-2 rounded w-full bg-white shadow-lg rounded-3xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {selectedModul}
            </button>

            {isOpen && (
              <ul className="absolute z-10 w-full border border-gray-100 bg-white shadow-lg rounded-3xl mt-1">
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="cursor-pointer p-2 hover:bg-red-500 hover:text-white"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {discussions.map((discussion) => (
            <div key={discussion.id} className="border border-gray-100 p-4 rounded mb-4 bg-white shadow-lg rounded-3xl">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-red-600 rounded-full flex justify-center items-center text-white font-bold mr-3">
                  {discussion.user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold">{discussion.user}</h3>
                  <span className="text-gray-500 text-sm">{discussion.time}</span>
                </div>
              </div>
              <p className="mb-4">{discussion.content}</p>
              <button className="text-red-600 font-bold">Reply</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discussion;
