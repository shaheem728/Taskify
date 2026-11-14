const InfoBox = ({ label, value }) => (
    <>
        <label className="text-xs font-medium text-muted">{label}</label>
        <p className="mt-0.5 text-[12px] font-medium text-text-secondary md:text-[13px]">
            {value}
        </p>
    </>
);

export default InfoBox;