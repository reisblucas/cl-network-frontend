import { toast } from 'sonner'
import { useNotificationsStore } from './notifications.store'
import { useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'

export function Notifications() {
  const notificationsStore = useNotificationsStore()
  useEffect(() => {
    notificationsStore.notifications.forEach((n) => {
      if (n.wasRendered) return

      toast[n.type](n.title, {
        duration: n.duration ?? 5000,
        description: n.description
        // action: {
        //   label: <X className="size-2" />,
        //   onClick: () => {
        //     notificationsStore.dismissNotification(n.id)
        //   }
        // }
      })

      notificationsStore.markAsRendered(n.id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationsStore.notifications])

  return <Toaster richColors />
}
