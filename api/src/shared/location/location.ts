import request from 'request';

export const getLocation = async (req: any, res: any) => {
    const userIp = req.ip;
    request('http://www.geoplugin.net/json.gp?ip=' + userIp, (e, response, body) => {
      const location = {
        city: body.geoplugin_regionName,
        latitude: body.geoplugin_latitude,
        longitude: body.geoplugin_longitude
      };
      return res.status(200).json({location});
    });
}