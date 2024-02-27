const date = new Date().getFullYear()

export default function Copyright() {
  return (
    <span className={"absolute bottom-3 right-3 text-xs z-50"}>
      Copyright © {date} Michael Sanchez
    </span>
  );
}
