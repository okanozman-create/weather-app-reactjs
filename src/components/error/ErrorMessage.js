export default function ErrorMessage({ message }) {
  const parts = message.split(/(Error: |city)/i);

  return (
    <div className="error">
      {parts.map((part, index) => {
        if (part.match(/Error:/i)) {
          return (
            <span key={index} style={{ color: "red" }}>
              {part}
            </span>
          );
        } else if (part.match(/city/i)) {
          return (
            <span
              key={index}
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                color: "yellow",
              }}
            >
              {part}
            </span>
          );
        } else {
          return <span key={index}>{part}</span>;
        }
      })}
    </div>
  );
}
