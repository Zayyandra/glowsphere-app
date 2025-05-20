export default function PageHeader({ title, breadcrumb, children }) {
  const renderCrumbs = () => {
    if (!breadcrumb) return null;

    if (typeof breadcrumb === "string") {
      return (
        <div className="flex items-center font-medium space-x-2 mt-2">
          <span className="text-gray-500">{breadcrumb}</span>
        </div>
      );
    }

    if (Array.isArray(breadcrumb)) {
      return (
        <div className="flex items-center font-medium space-x-2 mt-2">
          {breadcrumb.map((crumb, idx) => (
            <span key={idx} className="text-gray-500">
              {crumb}
              {idx < breadcrumb.length - 1 && <span className="text-gray-500">/</span>}
            </span>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-garis pb-4 mb-6 p-4">
      <div id="pageheader-left" className="flex flex-col">
        <h1 id="page-title" className="text-2xl md:text-3xl font-extrabold font-[--font-poppins-ExtraBold] text-[--color-teks]">
          {title}
        </h1>
        {renderCrumbs()}
      </div>
      <div id="action-button" className="mt-4 md:mt-0 flex gap-2">
        {children}
      </div>
    </header>
  );
}