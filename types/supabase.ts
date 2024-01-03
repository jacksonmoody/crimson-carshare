export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface location {
  lat: number | null
  long: number | null
  name: string | null
}

export interface Database {
  public: {
    Tables: {
      requests: {
        Row: {
          approved: boolean | null
          id: number
          requester: string | null
          ride: number | null
        }
        Insert: {
          approved?: boolean | null
          id?: number
          requester?: string | null
          ride?: number | null
        }
        Update: {
          approved?: boolean | null
          id?: number
          requester?: string | null
          ride?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "requests_requester_fkey"
            columns: ["requester"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_ride_fkey"
            columns: ["ride"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          }
        ]
      }
      rides: {
        Row: {
          capacity: number | null
          created_at: string
          date: string | null
          destination: location | null
          guests: string[] | null
          id: number
          owner: string | null
          source: location | null
          time: string | null
          transit: Database["public"]["Enums"]["Transit"] | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          date?: string | null
          destination?: location | null
          guests?: string[] | null
          id?: number
          owner?: string | null
          source?: location | null
          time?: string | null
          transit?: Database["public"]["Enums"]["Transit"] | null
        }
        Update: {
          capacity?: number | null
          created_at?: string
          date?: string | null
          destination?: location | null
          guests?: string[] | null
          id?: number
          owner?: string | null
          source?: location | null
          time?: string | null
          transit?: Database["public"]["Enums"]["Transit"] | null
        }
        Relationships: [
          {
            foreignKeyName: "rides_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          email: string | null
          house: Database["public"]["Enums"]["House"] | null
          id: string
          image: string | null
          name: string | null
          onboarded: boolean | null
          phone: string | null
          transit: Database["public"]["Enums"]["Transit"][] | null
          year: Database["public"]["Enums"]["Year"] | null
        }
        Insert: {
          email?: string | null
          house?: Database["public"]["Enums"]["House"] | null
          id: string
          image?: string | null
          name?: string | null
          onboarded?: boolean | null
          phone?: string | null
          transit?: Database["public"]["Enums"]["Transit"][] | null
          year?: Database["public"]["Enums"]["Year"] | null
        }
        Update: {
          email?: string | null
          house?: Database["public"]["Enums"]["House"] | null
          id?: string
          image?: string | null
          name?: string | null
          onboarded?: boolean | null
          phone?: string | null
          transit?: Database["public"]["Enums"]["Transit"][] | null
          year?: Database["public"]["Enums"]["Year"] | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      House:
        | "Adams"
        | "Cabot"
        | "Currier"
        | "Dunster"
        | "Eliot"
        | "Kirkland"
        | "Leverett"
        | "Lowell"
        | "Mather"
        | "Pforzheimer"
        | "Quincy"
        | "Winthrop"
        | "First Year Dorm"
      Transit: "Uber" | "Lyft" | "MBTA" | "Other"
      Year: "First Year" | "Sophomore" | "Junior" | "Senior"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
