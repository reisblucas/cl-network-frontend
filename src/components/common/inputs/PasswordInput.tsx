import { Field, FieldLabel } from '@/components/ui/field'
import { Flex } from '../Flex'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Eye, EyeOffIcon } from 'lucide-react'
import type { LoginInput } from '@/auth'
import { cn } from '@/lib/utils'

interface PasswordInputProps {
  id?: string
  placeholder?: string
  className?: React.HTMLAttributes<HTMLInputElement>['className']
}

export function PasswordInput({ id = 'password', placeholder = 'Test.123', className }: PasswordInputProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext<LoginInput>()

  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Field>
      <Flex className="justify-between">
        <FieldLabel htmlFor={id}>Password</FieldLabel>
        {errors.password && <span className="text-xs inline-block text-red-500">{errors.password.message}</span>}
      </Flex>
      <InputGroup onClick={togglePassword}>
        <InputGroupInput
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...register('password', { required: true })}
          className={cn('relative', className)}
        />
        <InputGroupAddon align="inline-end">{showPassword ? <EyeOffIcon /> : <Eye />}</InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
