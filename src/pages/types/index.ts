export interface LoginResponse {
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  client_ip: string;
  registered_ips: string[];
  dns_status: boolean;
}
