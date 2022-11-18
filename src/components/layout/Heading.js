export default function Heading({ title, avatar }) {
  return (
    <h1 className="heading text-center" src={avatar}>
      {title}
    </h1>
  );
}
