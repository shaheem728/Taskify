const InfoBox = ({ label, value }) => (
    <>
        <label className="text-sm font-medium text-muted">{label}</label>
        <p className="mt-0.5 text-sm font-medium text-text-secondary ">
            {value}
        </p>
    </>
);

export default InfoBox;