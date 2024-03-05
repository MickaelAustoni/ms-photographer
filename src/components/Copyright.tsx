const date = new Date().getFullYear()

export default function Copyright() {
  return (
    <span className={"absolute top-3 right-3 text-[0.6rem] z-50"} title={"Created by Mickaël Austoni"}>
      © {date} Michael Sanchez
    </span>
  );
}
