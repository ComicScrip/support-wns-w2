import Image from "next/image";
import { Inter } from "next/font/google";
import { ChangeEvent, useEffect, useState } from "react";
import StudentGroup from "@/components/StudentGroup";

const inter = Inter({ subsets: ["latin"] });
function distributeIntoGroups<T>(array: T[], numberOfGroups: number): T[][] {
  // initialisation
  const result: T[][] = [];
  for (let i = 0; i < numberOfGroups; i++) {
    result.push([]);
  }

  // distribution

  let nextGroupIndex = 0;
  for (let j = 0; j < array.length; j++) {
    const currentStudent = array[j];
    const nextGroup = result[nextGroupIndex];
    nextGroup.push(currentStudent);
    nextGroupIndex = nextGroupIndex + 1;
    if (nextGroupIndex === numberOfGroups) {
      nextGroupIndex = 0;
    }
  }

  return result;
}

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [numberofGroups, setNumberOfGroups] = useState(2);
  const [groups, setGroups] = useState<string[][]>([]);
  const students = userInput
    .replaceAll("\n", ",")
    .split(",")
    .map((student) => student.trim());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberOfGroups(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    setGroups(distributeIntoGroups(students, numberofGroups));
  }, [numberofGroups, userInput]);

  return (
    <div className="w-full h-[100vh] bg-gray-500 space-x-2 p-2">
      <textarea
        className="border rounded-lg pl-2"
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      <input
        className="border rounded-lg pl-2"
        type="number"
        min={2}
        value={numberofGroups}
        onChange={handleChange}
      />

      {groups.map((group, idx) => (
        <StudentGroup
          key={idx}
          group={{ name: "group " + (idx + 1), items: group }}
        />
      ))}
    </div>
  );
}
