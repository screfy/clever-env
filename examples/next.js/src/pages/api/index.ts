import { NextApiRequest, NextApiResponse } from 'next';
import { serverEnv } from '../../utils/server-env';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<typeof serverEnv>
) {
	res.send(serverEnv);
}
