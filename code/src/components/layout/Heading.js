export default function Heading({ title, avatar }) {
  return (
    <h1 className="capitalize" src={avatar}>
      {title}
    </h1>
  );
}
