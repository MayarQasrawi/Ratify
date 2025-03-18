
export default function Model({children}) {
  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} className="fixed inset-0 z-20 flex items-center justify-center">
      {children}
    </div>
  )
}
