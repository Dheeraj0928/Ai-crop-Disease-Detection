"""Dataset loading and augmentation — works with any class-folder layout."""
import tensorflow as tf
from tensorflow.keras import layers

from ml.config import BATCH_SIZE, IMG_SIZE, SEED, VALIDATION_SPLIT
from ml.logger import setup_logger

logger = setup_logger("crop_disease.data")


def build_augmentation() -> tf.keras.Sequential:
    return tf.keras.Sequential([
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
        layers.RandomZoom(0.1),
        layers.RandomContrast(0.1),
    ])


def load_datasets(data_dir: str):
    common = dict(
        directory=data_dir,
        image_size=(IMG_SIZE, IMG_SIZE),
        batch_size=BATCH_SIZE,
        validation_split=VALIDATION_SPLIT,
        seed=SEED,
    )
    train_ds = tf.keras.utils.image_dataset_from_directory(
        subset="training", **common
    )
    val_ds = tf.keras.utils.image_dataset_from_directory(
        subset="validation", **common
    )
    class_names = train_ds.class_names
    logger.info(
        "Loaded dataset from %s — %d classes, train/val split %.0f%%",
        data_dir,
        len(class_names),
        VALIDATION_SPLIT * 100,
    )
    return train_ds, val_ds, class_names


def prepare_datasets(train_ds, val_ds):
    augment = build_augmentation()
    autotune = tf.data.AUTOTUNE

    # Keep pixels in raw 0-255 range; the model's Rescaling layer normalizes internally.
    def prep_train(x, y):
        return augment(x, training=True), y

    train_ds = train_ds.map(prep_train, num_parallel_calls=autotune).prefetch(autotune)
    val_ds = val_ds.prefetch(autotune)
    return train_ds, val_ds
