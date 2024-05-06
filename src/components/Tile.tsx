interface TileProps {
  isBomb: boolean;
  revealed: boolean;
  neighborValue: number;
  isFlag: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Tile({
  isBomb,
  revealed,
  neighborValue,
  isFlag,
  onClick,
  onContextMenu,
}: TileProps) {
  let tileText = "";

  if (revealed) {
    if (isBomb) {
      tileText = "💣";
    } else if (neighborValue) {
      tileText = `${neighborValue}`;
    }
  }

  if (isFlag) {
    tileText = "🚩";
  }

  return (
    <div
      className={`${
        !revealed ? "bg-cerise" : "bg-turquoise"
      } bg-cerise p-1 border hover:bg-black flex justify-center items-center text-anti-flash-white font-bold `}
      onClick={!revealed && !isFlag ? onClick : undefined}
      onContextMenu={!revealed ? onContextMenu : undefined}
    >
      {tileText}
    </div>
  );
}
