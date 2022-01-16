import "./waiting.css";
type WaitingProps = {
  height?: string;
  width?: string;
  isPage?: boolean;
};
const Waiting = ({ height = "h-14", width = "w-14", isPage }: WaitingProps) => {
  return (
    <div
      className={
        isPage
          ? "w-full min-h-screen flex justify-center items-center text-black"
          : ""
      }
    >
      <div className="flex justify-center items-center">
        <div id="loading" className={`${width} ${height}`}></div>
      </div>
    </div>
  );
};

export default Waiting;
