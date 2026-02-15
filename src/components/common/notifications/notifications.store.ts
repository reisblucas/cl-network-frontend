import { nanoid } from 'nanoid'
import { create } from 'zustand'

type Notification = {
  id: string
  title: string
  description?: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  wasRendered?: boolean
}

type NotificationsStore = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  dismissNotification: (id: string) => void
  markAsRendered: (id: string) => void
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, { id: nanoid(), ...notification }]
    })),
  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(({ id: nid }) => nid !== id)
    }))
  },
  markAsRendered: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, wasRendered: true } : n))
    }))
  }
}))
