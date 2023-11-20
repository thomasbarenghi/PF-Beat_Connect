interface FormContainerProps {
  children: React.ReactNode
}

const FormContainer = ({ children }: FormContainerProps) => <div className='flex flex-col gap-3'>{children}</div>

export default FormContainer
