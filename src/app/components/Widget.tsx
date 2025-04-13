const Widget = () => {
    return (
      <div className="p-4 border rounded bg-gray-100">
        <h2 className="text-lg font-bold mb-2">Widget Preview</h2>
        <iframe
          src={`/widget`}
          width="100%"
          height="200"
          style={{ border: 'none' }}
          title="Widget Preview"
        ></iframe>
      </div>
    );
  };
  
  export default Widget;