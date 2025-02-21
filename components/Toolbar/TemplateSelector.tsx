const TemplateSelector = ({ onTemplateSelected }) => {
  const templates = [
    { label: 'Single Photo', value: 'single-photo' },
    { label: 'Multi Photo', value: 'multi-photo' },
  ];

  return (
    <div className="template-selector mt-4 space-y-2">
      {templates.map((template, idx) => (
        <button
          key={idx}
          className="bg-green-800 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition-colors duration-200"
          onClick={() => onTemplateSelected(template.value)}
        >
          {template.label}
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;