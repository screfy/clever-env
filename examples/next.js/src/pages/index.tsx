import Link from 'next/link';
import { clientEnv } from '../utils/client-env';

export default function Home() {
	return (
		<main>
			<h3>Client environment variables:</h3>
			<p>
				<code>{JSON.stringify(clientEnv, null, 2)}</code>
			</p>
			<p>
				Visit{' '}
				<Link href="/api" passHref>
					<a>/api</a>
				</Link>{' '}
				to see server environment variables.
			</p>
		</main>
	);
}
