import axios from 'axios'

/** Base URL for the FastAPI backend */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
})

// --- Types ---
export interface ChatRequest { message: string }
export interface ChatResponse { reply: string }

export interface OrderRequest {
    name: string
    phone: string
    address: string
    variant: '11g' | '33g'
}
export interface OrderResponse { message: string; order_id: string }

// --- Chat ---
export const sendChatMessage = async (payload: ChatRequest): Promise<ChatResponse> => {
    const { data } = await api.post<ChatResponse>('/chat', payload)
    return data
}

// --- Order ---
export const placeOrder = async (payload: OrderRequest): Promise<OrderResponse> => {
    const { data } = await api.post<OrderResponse>('/order', payload)
    return data
}

export default api
