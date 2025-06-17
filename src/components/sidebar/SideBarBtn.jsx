
const SideBarBtn = ({ classNames, buttonText, buttonIcon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`my-[.8rem] rounded-lg bg-[#3F3F3F] text-white hover:bg-[#6E6D6D] h-[2.6rem] w-[80%] flex items-center ${classNames}`}
    >
      <img src={buttonIcon} alt="icon" width={25} className="mx-3" />
      {buttonText}
    </div>
  );
};

export default SideBarBtn;
