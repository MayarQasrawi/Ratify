import Welcome from "../../components/admin/shared/Welcome";

export default function AdminHome() {
  console.log('admin home')
  return (
    <div className="flex flex-col gap-5">
      <Welcome />
    </div>
  );
}
