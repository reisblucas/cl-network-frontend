import { Field, FieldLabel } from '@/components/ui/field'
import { Flex } from '../Flex'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useState } from 'react'
import { useFormContext, type FieldValues, type Path } from 'react-hook-form'
import { Eye, EyeOffIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordInputProps<T extends FieldValues> {
  id?: Path<T>
  label?: string
  placeholder?: string
  className?: React.HTMLAttributes<HTMLInputElement>['className']
}

export function PasswordInput<T extends FieldValues>({
  id = 'password' as Path<T>,
  label = 'Password',
  placeholder = 'Type your password here',
  className
}: PasswordInputProps<T>) {
  const {
    register,
    formState: { errors }
  } = useFormContext<T>()

  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Field>
      <Flex className="justify-between">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {errors[id] && <span className="text-xs inline-block text-red-500">{errors[id]?.message?.toString()}</span>}
      </Flex>
      <InputGroup>
        <InputGroupInput
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(id, { required: true })}
          className={cn('relative placeholder-shown:italic', className)}
        />
        <InputGroupAddon align="inline-end" onClick={togglePassword}>
          {showPassword ? <EyeOffIcon /> : <Eye />}
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
