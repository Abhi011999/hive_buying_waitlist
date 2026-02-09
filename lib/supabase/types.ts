export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          display_order: number
          icon: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      group_members: {
        Row: {
          buying_timeline: string
          city: string | null
          id: string
          joined_at: string
          product_id: string
          user_id: string
        }
        Insert: {
          buying_timeline: string
          city?: string | null
          id?: string
          joined_at?: string
          product_id: string
          user_id: string
        }
        Update: {
          buying_timeline?: string
          city?: string | null
          id?: string
          joined_at?: string
          product_id?: string
          user_id?: string
        }
        Relationships: []
      }
      group_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          brand: string | null
          created_at: string
          description: string | null
          discount_label: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
          subcategory_id: string
          target_group_size: number
        }
        Insert: {
          brand?: string | null
          created_at?: string
          description?: string | null
          discount_label?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          subcategory_id: string
          target_group_size?: number
        }
        Update: {
          brand?: string | null
          created_at?: string
          description?: string | null
          discount_label?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          subcategory_id?: string
          target_group_size?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subcategories: {
        Row: {
          category_id: string
          created_at: string
          display_order: number
          id: string
          name: string
          slug: string
        }
        Insert: {
          category_id: string
          created_at?: string
          display_order?: number
          id?: string
          name: string
          slug: string
        }
        Update: {
          category_id?: string
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
