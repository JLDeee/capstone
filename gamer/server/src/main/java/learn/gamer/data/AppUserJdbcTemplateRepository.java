package learn.gamer.data;

import learn.gamer.models.AppUser;

public class AppUserJdbcTemplateRepository {

    private final RowMapper<SolarPanel> mapper = (resultSet, rowIndex) -> {
        AppUser appUser  = new AppUser();

        solarPanel.setId(resultSet.getInt("id"));
        solarPanel.setSection(resultSet.getString("section"));
        solarPanel.setRow(resultSet.getInt("row"));
        solarPanel.setColumn(resultSet.getInt("column"));
        solarPanel.setYearInstalled(resultSet.getInt("year_installed"));

        Material material = Material.valueOf(resultSet.getString("material"));
        solarPanel.setMaterial(material);

        solarPanel.setTracking(resultSet.getBoolean("is_tracking"));

        return solarPanel;
    };
}
