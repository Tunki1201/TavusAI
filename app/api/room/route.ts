import { NextApiRequest, NextApiResponse } from 'next';  

const apiRoute = async (req: NextApiRequest, res: NextApiResponse) => {  
  if (req.method !== 'POST') {  
    return res.status(405).json({ message: 'Method not allowed' });  
  }  

  try {  
    const options = {  
      method: 'POST',  
      headers: {  
        Accept: 'application/json',  
        'Content-Type': 'application/json',  
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DAILY_API_KEY}`,  
      },  
      body: JSON.stringify({  
        properties: {  
          enable_prejoin_ui: true,  
          enable_network_ui: true,  
          enable_screenshare: true,  
          enable_chat: true,  
          exp: Math.round(Date.now() / 1000) + 300,  
          eject_at_room_exp: true,  
        },  
      }),  
    };  

    const dailyRes = await fetch(`${process.env.NEXT_PUBLIC_DAILY_DOMAIN}/rooms`, options);  

    if (!dailyRes.ok) {  
      throw new Error(`HTTP error! status: ${dailyRes.status}`);  
    }  

    const response = await dailyRes.json();  

    if (response.error) {  
      return res.status(500).json(response.error);  
    }  

    res.status(200).json(response);  
  } catch (err) {  
    console.error(err);  
    res.status(500).json({ message: 'Error creating room' });  
  }  
};  

export default apiRoute;