import { cn } from '@/lib/utils'

export function Flex({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('w-full flex flex-row', className)} {...props}>
      {children}
    </div>
  )
}
