import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { LoginResponse } from '../types';

interface TAuth {
  username: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  const { apiKey } = req.query;
  const auth: TAuth = {
    username: apiKey as string,
    password: 'x'
  };

  try {
    const [userRes, addressRes, dnsRes, systemRes] = await Promise.all([
      axios.get('https://www.getflix.com.au/api/v1/profile.json', { auth }),
      axios.get('https://www.getflix.com.au/api/v1/addresses.json', { auth }),
      axios.get('https://check.getflix.com.au/?format=json', { auth }),
      axios.get('https://www.getflix.com.au/api/v1/system.json', { auth })
    ]);

    const userData = userRes.data;
    const addressData: { ip_address: string }[] = addressRes.data;
    const dnsData = dnsRes.data;
    const systemData = systemRes.data;

    const responseData = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      full_name: `${userData.first_name} ${userData.last_name}`,
      email: userData.email,
      client_ip: systemData.client_ip,
      registered_ips: addressData.map(address => address.ip_address),
      dns_status: dnsData.dns
    };

    res.status(200).json(responseData);
  } catch {}
}
