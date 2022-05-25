use fern::colors::{Color, ColoredLevelConfig};

pub fn setup_logger() -> Result<(), fern::InitError> {
  let colors = ColoredLevelConfig::new()
    .info(Color::Green)
    .warn(Color::Yellow)
    .error(Color::Red)
    .debug(Color::Magenta);

  fern::Dispatch::new()
    .format(move |out, message, record| {
      out.finish(format_args!(
        "{}[{}][{}] {}",
        chrono::Local::now().format("[%Y-%m-%d][%H:%M:%S]"),
        record.target(),
        colors.color(record.level()),
        message
      ))
    })
    .level(log::LevelFilter::Debug)
    .chain(std::io::stdout())
    .apply()?;

  Ok(())
}
