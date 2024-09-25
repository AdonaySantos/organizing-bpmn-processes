import "../static/Header.css";

export default function Header(props) {

  return (
    <>
      <button onClick={props.item.handleClick}>{props.item.nome}</button>
    </>
  );
}
