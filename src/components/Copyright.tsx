const currentYear = new Date().getFullYear();

export default function Copyright() {
  return (
    <span className={"absolute bottom-3 left-3 text-xs z-50"} title={"Created by Mickaël Austoni"}>
      © {currentYear} Michael Sanchez
    </span>
  );
}
