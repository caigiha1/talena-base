interface BreadcrumbProps {
  pageName?: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-headlines-title font-bold text-black dark:text-white font-urbanist">
        {pageName}
      </h2>
    </div>
  );
};

export default Breadcrumb;
