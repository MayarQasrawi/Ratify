
export default function Modal({children ,className=""}) {
  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} className={`fixed inset-0 z-40 flex items-center justify-center ${className}`}>
      {children}
    </div>
  )
}
