import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import type { LucideIcon } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'

type NavSecondaryProps = {
  items: {
    label: string
    href: string
    icon: LucideIcon
    isActive: boolean
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>

const bugInputSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.string().min(1).max(1024)
})
type BugInput = z.infer<typeof bugInputSchema>
export function NavSecondary({ items, ...props }: NavSecondaryProps) {
  const DIALOG_INITIAL_STATE: Record<string, boolean> = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc[item.label] = false
        return acc
      },
      {} as Record<string, boolean>
    )
  }, [items])
  const [open, setOpen] = useState(DIALOG_INITIAL_STATE)
  const handleDialogOpenChange = (lable: string) => setOpen((prev) => ({ ...prev, [lable]: !prev[lable] }))

  const bugFormMethods = useForm<BugInput>({
    resolver: standardSchemaResolver(bugInputSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const { handleSubmit, register } = bugFormMethods
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <Dialog key={item.label} open={open[item.label]} onOpenChange={() => handleDialogOpenChange(item.label)}>
              <SidebarMenuItem>
                <DialogTrigger asChild>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </DialogTrigger>
                <DialogContent className=" sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      {item.label}
                    </DialogTitle>
                  </DialogHeader>

                  <FormProvider {...bugFormMethods}>
                    <form onSubmit={handleSubmit((data) => console.log(data))}>
                      <FieldGroup className="gap-4">
                        <Field>
                          <FieldLabel htmlFor="bug-input">Title</FieldLabel>
                          {/* porvide some templates later */}
                          <Input id="bug-input" placeholder="[PLACE::ACTION] Title" {...register('title')} />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="bug-textarea">Description</FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              id="bug-textarea"
                              placeholder={`Description of your ${item.label.toLowerCase()}...`}
                              {...register('description')}
                              maxLength={bugInputSchema.shape.description.maxLength ?? undefined}
                              className="max-h-[30vh] overflow-y-auto"
                            />
                            <InputGroupAddon align="block-end" className="flex flex-end">
                              <InputGroupText>
                                {bugFormMethods.watch('description').length ?? 0}/
                                {bugInputSchema.shape.description.maxLength}
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </Field>
                        <DialogFooter>
                          {/* Attach image code here */}
                          <Button type="button" variant="destructive" onClick={() => bugFormMethods.reset()}>
                            Clear
                          </Button>
                          <Button type="submit" variant="secondary">
                            Submit
                          </Button>
                        </DialogFooter>
                      </FieldGroup>
                    </form>
                  </FormProvider>
                </DialogContent>
              </SidebarMenuItem>
            </Dialog>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
