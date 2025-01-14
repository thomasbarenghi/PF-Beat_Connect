interface FormRowProps {
  children: React.ReactNode
}

const FormRow = ({ children }: FormRowProps) => (
  <div className='flex flex-col lg:flex-row  gap-4 w-full'>{children}</div>
)

export default FormRow
