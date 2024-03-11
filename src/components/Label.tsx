interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({children, ...props}: Props) => {
  return (
    <label {...props} className='my-20 text-cyan-500'>
      {children}
    </label>
  )
}

export default Label
