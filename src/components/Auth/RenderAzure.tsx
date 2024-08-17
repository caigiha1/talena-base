import AzureIcon from '../../assets/logo/icon-azure';
import { Button } from '../base/button/Button';

function RenderAzure({onClick}: {
  readonly onClick: () => void;
}) {
  return (
    <Button
      className="flex w-full justify-center gap-4 rounded-xl border border-meta-9 bg-white py-6 px-8 text-base font-medium text-black focus:outline-none focus:ring-2 hover:bg-gray-300"
      onClick={onClick}
    >
      <AzureIcon />
      Continue with Azure
    </Button>
  );
}

export default RenderAzure;
