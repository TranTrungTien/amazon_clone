type MessageBoxProps = {
  message: string;
  title?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  handleCloseModal: () => void;
};

const MessageBox = ({
  message,
  title = "Message Box",
  handleCloseModal,
}: MessageBoxProps) => {
  const onCloseModal = () => {
    handleCloseModal();
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.6),  rgba(0,0,0,0.6))",
        zIndex: 9999,
      }}
      className={`fixed -left-3 top-0 w-screen h-screen bg-gray-600 rounded  flex justify-center items-center`}
    >
      <div
        style={{ minHeight: " 300px" }}
        className="bg-gray-100 w-1/3 h-auto rounded-md relative"
      >
        <div className="border-b border-gray-400 shadow-md text-center w-full py-2 relative">
          <h1 className="font-bold text-lg  ">{title}</h1>
          <button
            onClick={onCloseModal}
            className="absolute top-1 right-2 px-2 py-px rounded-full hover:bg-gray-400 font-bold text-xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="w-full h-full grid place-content-center">
          <p className="text-center font-semibold">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
