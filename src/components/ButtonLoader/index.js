
export function ButtonLoader({ title, loading }) {

    return (
        <button disabled={loading}>
            {loading && (
                <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                />
            )}
            <span>{title}</span>
        </button>
    );

}
