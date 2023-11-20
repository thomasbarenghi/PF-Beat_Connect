interface FormColumnProps {
  children: React.ReactNode
  className?: string
}

const FormColumn = ({ children, className }: FormColumnProps) => (
  <div className={`flex flex-col gap-4 ${className}`}>{children}</div>
)

export default FormColumn
