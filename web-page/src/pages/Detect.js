import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Button, CircularProgress, Box, Chip } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Clear from "@material-ui/icons/Clear";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import SearchIcon from "@material-ui/icons/Search";
import PageLayout from "../components/PageLayout";
import PageHeader from "../components/PageHeader";
import { tokens } from "../theme";

const axios = require("axios").default;

// Short, actionable guidance per class so a diagnosis leads somewhere useful.
const DISEASE_INFO = {
  "Bacterial-spot": "Remove affected leaves and apply copper-based bactericide. Avoid overhead watering.",
  "Early-blight": "Prune lower leaves, improve airflow, and apply a fungicide (chlorothalonil/mancozeb).",
  "Late-blight": "Act fast — remove and destroy infected plants. Apply protectant fungicide to healthy ones.",
  "Leaf-mold": "Lower humidity, increase ventilation, and use a labeled fungicide on affected foliage.",
  "Mosaic-virus": "No cure — remove infected plants, control aphids, and disinfect tools to stop spread.",
  "Septoria-leaf-spot": "Remove infected leaves, mulch soil, and apply fungicide at first symptoms.",
  "Yellow-leaf-curl-virus": "Remove infected plants and control whiteflies (the vector) with traps/insecticide.",
  Healthy: "No disease detected. Keep monitoring and maintain good watering and airflow.",
};

const guidanceFor = (cls) =>
  DISEASE_INFO[cls] || "Consult a local agronomist for a confirmed diagnosis and treatment plan.";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    maxWidth: 1000,
    margin: "0 auto",
    borderRadius: tokens.radius.xl,
    backgroundColor: tokens.colors.surface,
    border: `1px solid ${tokens.colors.border}`,
    boxShadow: tokens.shadow.lg,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: { flexDirection: "row" },
  },
  leftPanel: {
    padding: tokens.spacing.card,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: tokens.colors.surfaceMuted,
    minHeight: 360,
    [theme.breakpoints.down("sm")]: { padding: tokens.spacing.cardMobile },
  },
  rightPanel: {
    padding: tokens.spacing.card,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderTop: `1px solid ${tokens.colors.border}`,
    minHeight: 360,
    [theme.breakpoints.up("md")]: {
      borderTop: "none",
      borderLeft: `1px solid ${tokens.colors.border}`,
    },
    [theme.breakpoints.down("sm")]: { padding: tokens.spacing.cardMobile },
  },
  media: {
    height: 280,
    width: "100%",
    maxWidth: 400,
    objectFit: "cover",
    borderRadius: tokens.radius.lg,
    marginBottom: 20,
    boxShadow: tokens.shadow.md,
  },
  clearButton: {
    marginTop: 8,
    borderRadius: tokens.radius.pill,
    padding: "10px 28px",
    minHeight: 44,
    fontWeight: 600,
    textTransform: "none",
    background: tokens.colors.danger,
    color: "white",
    "&:hover": { background: tokens.colors.dangerDark },
  },
  resultBox: { textAlign: "center", width: "100%" },
  classLabel: {
    fontWeight: 800,
    color: tokens.colors.primary,
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    marginBottom: 8,
    textTransform: "capitalize",
    wordBreak: "break-word",
  },
  confidenceText: { fontSize: "1rem", color: tokens.colors.textSecondary },
  stateBox: {
    textAlign: "center",
    padding: 24,
    color: tokens.colors.textSecondary,
  },
  stateIcon: {
    fontSize: 48,
    color: tokens.colors.textMuted,
    marginBottom: 12,
  },
  errorBox: {
    textAlign: "center",
    padding: 24,
    background: "#fef2f2",
    borderRadius: tokens.radius.lg,
    border: "1px solid #fecaca",
  },
  dropzone: {
    width: "100%",
    minHeight: 220,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  panelTitle: {
    fontWeight: 700,
    color: tokens.colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  panelDesc: {
    color: tokens.colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 1.6,
  },
  guidanceBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: tokens.radius.md,
    background: tokens.colors.surfaceMuted,
    border: `1px solid ${tokens.colors.border}`,
    textAlign: "left",
    maxWidth: 360,
    marginLeft: "auto",
    marginRight: "auto",
  },
  guidanceTitle: {
    fontWeight: 700,
    color: tokens.colors.textPrimary,
    marginBottom: 4,
  },
  guidanceText: {
    color: tokens.colors.textSecondary,
    lineHeight: 1.6,
  },
}));

const Detect = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const confidence = data ? (parseFloat(data.pred_conf) * 100).toFixed(1) : "0";

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!selectedFile) return;
    let cancelled = false;

    const run = async () => {
      const formData = new FormData();
      formData.append("file", selectedFile);
      setIsloading(true);
      setError("");

      try {
        const url = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/predict";
        const res = await axios.post(url, formData);
        if (cancelled) return;
        if (res.status === 200) setData(res.data);
        else setError("Unexpected response from server.");
      } catch (err) {
        if (!cancelled) {
          const msg = err.response?.data?.detail || err.message || "Unknown error";
          setError(`Could not analyze image. ${msg}`);
        }
      } finally {
        if (!cancelled) setIsloading(false);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [selectedFile]);

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(undefined);
    setPreview(undefined);
    setError("");
  };

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      clearData();
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
    setError("");
  };

  const isHealthy = data?.pred_class === "Healthy";

  return (
    <PageLayout id="main-content">
      <PageHeader
        title="Disease Detection"
        subtitle="Upload a crop leaf photo for instant AI analysis"
      />

      <Card className={`${classes.card} fade-in`} elevation={0}>
        <section className={classes.leftPanel} aria-label="Image upload">
          {!image ? (
            <>
              <Typography variant="h5" component="h2" className={classes.panelTitle}>
                Check Your Plant&apos;s Health
              </Typography>
              <Typography variant="body2" className={classes.panelDesc}>
                Drag and drop or click to upload a clear leaf photo (PNG, JPG).
              </Typography>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText="Drag & drop or click to upload"
                onChange={onSelectFile}
                Icon={CloudUploadIcon}
                showPreviewsInDropzone={false}
                filesLimit={1}
                classes={{ root: classes.dropzone }}
                dropzoneProps={{ "aria-label": "Upload crop leaf image" }}
              />
            </>
          ) : (
            <>
              <img src={preview} alt="Uploaded crop leaf for analysis" className={classes.media} />
              <Button
                variant="contained"
                className={classes.clearButton}
                onClick={clearData}
                startIcon={<Clear />}
                aria-label="Upload a different image"
              >
                Analyze Another
              </Button>
            </>
          )}
        </section>

        <section className={classes.rightPanel} aria-label="Analysis results" aria-live="polite">
          {isLoading && (
            <Box display="flex" flexDirection="column" alignItems="center" role="status">
              <CircularProgress size={52} style={{ color: tokens.colors.primary }} />
              <Typography variant="h6" style={{ marginTop: 20, fontWeight: 600, color: tokens.colors.textPrimary }}>
                Analyzing leaf pattern…
              </Typography>
              <Typography variant="body2" style={{ marginTop: 8, color: tokens.colors.textSecondary, textAlign: "center" }}>
                Scanning for bacterial spot, blight, mold, and other symptoms.
              </Typography>
            </Box>
          )}

          {!isLoading && error && (
            <div className={classes.errorBox} role="alert">
              <ErrorOutlineIcon style={{ fontSize: 40, color: tokens.colors.danger }} />
              <Typography variant="h6" style={{ marginTop: 12, fontWeight: 600 }}>Analysis Failed</Typography>
              <Typography variant="body2" style={{ marginTop: 8, color: tokens.colors.textSecondary }}>{error}</Typography>
              <Button variant="outlined" color="primary" onClick={clearData} style={{ marginTop: 16 }}>
                Try Again
              </Button>
            </div>
          )}

          {!isLoading && !data && !image && !error && (
            <div className={classes.stateBox}>
              <SearchIcon className={classes.stateIcon} />
              <Typography variant="h6" style={{ fontWeight: 600, color: tokens.colors.textPrimary }}>
                Results will appear here
              </Typography>
              <Typography variant="body2" style={{ marginTop: 8 }}>
                Upload a leaf image to get started.
              </Typography>
            </div>
          )}

          {!isLoading && data && (
            <div className={`${classes.resultBox} fade-in`}>
              <Typography variant="overline" style={{ letterSpacing: 2, color: tokens.colors.textMuted }}>
                Diagnosis
              </Typography>
              <Typography className={classes.classLabel} component="p">
                {data.pred_class.replace(/-/g, " ")}
              </Typography>

              <Box marginTop={3} width="100%" maxWidth={320} marginX="auto">
                <Box display="flex" justifyContent="space-between" marginBottom={0.5}>
                  <Typography className={classes.confidenceText}>Confidence</Typography>
                  <Typography className={classes.confidenceText}><strong>{confidence}%</strong></Typography>
                </Box>
                <div className="confidence-bar-bg" role="progressbar" aria-valuenow={confidence} aria-valuemin={0} aria-valuemax={100}>
                  <div className="confidence-bar-fill" style={{ width: `${confidence}%` }} />
                </div>
              </Box>

              <Box marginTop={3}>
                <Chip
                  label={isHealthy ? "Healthy Plant" : "Action Recommended"}
                  style={{
                    backgroundColor: isHealthy ? tokens.colors.primary : tokens.colors.danger,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    padding: "18px 8px",
                  }}
                />
              </Box>

              <div className={classes.guidanceBox}>
                <Typography variant="subtitle2" className={classes.guidanceTitle}>
                  {isHealthy ? "Recommendation" : "Suggested Action"}
                </Typography>
                <Typography variant="body2" className={classes.guidanceText}>
                  {guidanceFor(data.pred_class)}
                </Typography>
              </div>
            </div>
          )}
        </section>
      </Card>
    </PageLayout>
  );
};

export default Detect;
