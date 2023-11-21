function StudentGroup({
  group: { name, items },
}: {
  group: { name: string; items: string[] };
}) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {items.map((student, idx) => (
          <li key={idx}>{student}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentGroup;
