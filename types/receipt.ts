export interface ReceiptItem {
  name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Receipt {
  merchant: string;
  date: string;
  items: ReceiptItem[];
  grand_total: number;
}

export interface AnalyzeReceiptResponse {
  success: boolean;
  data: Receipt;
  message?: string;
}